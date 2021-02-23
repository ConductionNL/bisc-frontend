import times from 'lodash/times'

export const suppliersMock: SupplierMock[] = times(100, num => ({
    naam: `Aanbieder ${num}`,
    adres: `Adres ${num}`,
    plaats: `Plaats ${num}`,
}))
console.log(suppliersMock)
export interface SupplierMock {
    naam: string
    adres: string
    plaats: string
}
