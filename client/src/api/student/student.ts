import { Student } from 'api/types/types'
import { useGet } from 'restful-react'

export interface StudentsParams {}

export interface StudentsData {
    results: Student[]
}

export function useGetStudents() {
    return useGet<StudentsData>({
        path: '/students',
    })
}

export function useGetStudent(studentId: string) {
    return useGet<Student>({
        path: `/students/${studentId}`,
    })
}
