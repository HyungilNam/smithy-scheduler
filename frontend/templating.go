package main

import (
	"bytes"
	"errors"
	"html/template"
	"io"
	"sort"
	"strconv"
	"strings"
)

func generateMainPageHTML(w io.Writer) error {
	var MajorList struct {
		Majors []string
	}
	var err error

	MajorList.Majors, err = getMajorListFromDB()
	if err != nil {
		panic(err)
	}

	tmpl, err := template.ParseFiles("./template/index.html")
	if err != nil {
		panic(err)
	}

	return tmpl.Execute(w, MajorList)
}

// This function returns HTML code of subjects table. HTML template package is used.
func drawSubjectTable(subjects []Subject) (string, error) {
	var data struct {
		GradeNames             []string
		SubjectsDividedByGrade map[int][]Subject

		SubjectsOrderedForTable [][]Subject
		IsGradeEmpty            []bool
	}
	// divide subjects by grade

	var err error
	data.SubjectsDividedByGrade, err = divideSubjectsByGrade(subjects)
	if err != nil {
		return "", err
	}

	// sort subjects which are divided by grade
	/* for grade := range data.SubjectsDividedByGrade {
	 *   sort.Sort(BySubjectName(data.SubjectsDividedByGrade[grade]))
	 * } */

	// check which grade has no subjects
	for i := 0; i <= 5; i++ {
		if len(data.SubjectsDividedByGrade[i]) == 0 {
			data.IsGradeEmpty = append(data.IsGradeEmpty, true)
		} else {
			data.IsGradeEmpty = append(data.IsGradeEmpty, false)
		}
	}

	// we can check whether subjects has 5th grade or not
	// and there may be cases that does not have 1th, 2nd, 3th or 4rd grade
	// numberOfGrade := len(data.SubjectsDividedByGrade)

	// when 0th grade is exist (0th grade means that here is no information about grade)

	// Fill GradeNames
	data.GradeNames = append(data.GradeNames, "학년정보없음")
	// from 1st grade to 5th grade
	for i := 1; i <= 5; i++ {
		data.GradeNames = append(data.GradeNames, strconv.Itoa(i)+"학년")
	}

	// make each grade's subject count same to fill blank data.
	// get maximum count
	var subjectCounts []int
	for _, subjects := range data.SubjectsDividedByGrade {
		subjectCounts = append(subjectCounts, len(subjects))
	}
	// sort to find maximum count
	sort.Sort(sort.Reverse(sort.IntSlice(subjectCounts)))
	// fmt.Println(subjectCounts)
	maximumSubjectCount := subjectCounts[0]

	// fill the blank data
	// 일단 꽉채워놓자 여긴 map이라서 괜찮다
	for idx := 0; idx <= 5; idx++ {
		for len(data.SubjectsDividedByGrade[idx]) < maximumSubjectCount {
			data.SubjectsDividedByGrade[idx] = append(data.SubjectsDividedByGrade[idx], Subject{
				GwamokNm: " ",
			})
		}
	}

	// for check whether each grade have same number of subjects
	/* subjectCounts = nil
	 * for _, subjects := range data.subjectsDividedByGrade {
	 *   subjectCounts = append(subjectCounts, len(subjects))
	 * }
	 * // sort to find maximum count
	 * sort.Sort(sort.Reverse(sort.IntSlice(subjectCounts)))
	 * fmt.Println(subjectCounts) */

	// fill data for table
	// 건축학부 5학년 처리. 여기서 터지네
	/* for rowNumber := 0; rowNumber < maximumSubjectCount; rowNumber++ {
	 *   var row []Subject
	 *   for grade := 1; grade <= numberOfGrade; grade++ {
	 *     // for debugging
	 *     row = append(row, data.SubjectsDividedByGrade[grade][rowNumber])
	 *   }
	 *   data.SubjectsOrderedForTable = append(data.SubjectsOrderedForTable, row)
	 * } */

	// fill the last data
	for rowNumber := 0; rowNumber < maximumSubjectCount; rowNumber++ {
		var row []Subject
		for grade := 0; grade <= 5; grade++ {
			// for debugging
			if len(data.SubjectsDividedByGrade[grade]) == 0 {
				row = append(row, Subject{})
			} else {
				row = append(row, data.SubjectsDividedByGrade[grade][rowNumber])
			}
		}
		data.SubjectsOrderedForTable = append(data.SubjectsOrderedForTable, row)
	}

	// remove empty grade and subjects
	for grade, gradeIsEmpty := range data.IsGradeEmpty {
		if gradeIsEmpty {
			data.GradeNames[grade] = ""
			for row := 0; row < maximumSubjectCount; row++ {
				data.SubjectsOrderedForTable[row][grade] = Subject{}
			}
		}
	}

	// templating to draw the table
	tmpl, err := template.ParseFiles("./template/subjectTable.html")
	if err != nil {
		return "", err
	}

	// generate html code and save it to source variable
	var source bytes.Buffer
	err = tmpl.Execute(&source, data)
	if err != nil {
		return "", err
	}

	return source.String(), nil
}

func divideSubjectsByGrade(subjects []Subject) (map[int][]Subject, error) {
	var subjectsDividedByGrade map[int][]Subject = make(map[int][]Subject)
	for _, subject := range subjects {
		// TODO: Issue. If IsuGrade has empty value, it is set to first grade.
		var grade int
		var err error
		if subject.IsuGrade != "" {
			grade, err = strconv.Atoi(subject.IsuGrade)
			if err != nil {
				return nil, err
			}
		} else {
			// 0th grade means that there is no grade
			grade = 0
		}
		subjectsDividedByGrade[grade] = append(subjectsDividedByGrade[grade], subject)
	}

	return subjectsDividedByGrade, nil
}

type BindedSubject struct {
	Name     string
	Subjects []Subject
}

// This function receives a slice of subjects and return a slice of subjects binded by subject name
func bindSameSubject(subjects []Subject) ([]BindedSubject, error) {
	if len(subjects) == 0 {
		return nil, errors.New("(bindSameSubject) Empty slice is received")
	}

	sort.Sort(BySubjectName(subjects))

	// init binding
	var result []BindedSubject
	formerSubjectName := subjects[0].GwamokNm
	var buffer BindedSubject = BindedSubject{}
	buffer.Name = formerSubjectName

	for _, subject := range subjects {
		if strings.Compare(formerSubjectName, subject.GwamokNm) == 0 {
			// when current subject is same with former
			buffer.Subjects = append(buffer.Subjects, subject)
		} else {
			// when current subject is not same with former

			// append to result
			result = append(result, buffer)

			// reinitialize buffer
			buffer.Name = ""
			buffer.Subjects = nil

			// insert new subject to buffer
			formerSubjectName = subject.GwamokNm
			buffer.Name = formerSubjectName
			buffer.Subjects = append(buffer.Subjects, subject)
		}
	}

	return result, nil
}