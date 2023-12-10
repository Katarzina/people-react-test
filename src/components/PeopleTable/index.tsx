import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Table, TablePaginationConfig, notification, Spin } from 'antd'
import SearchBar from '../SearchBar'
import { PersonDetail } from '../PersonDetail'
import { ColumnsType } from 'antd/es/table'

const buttonStyle = {
    color: 'blue',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

export interface IPerson {
    name: string
    birth_year: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    gender: string
    homeworld: string
    films: string[]
    species: string[]
    vehicles: string[]
    starships: string[]
    created: string
    edited: string
    url: string
}

const PeopleTable: React.FC = () => {
    const [people, setPeople] = useState<IPerson[]>([])
    const [filteredData, setFilteredData] = useState<IPerson[]>([])
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>(0)
    const [searchText, setSearchText] = useState<string>('')
    const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const showModal = (person: IPerson) => {
        setSelectedPerson(person)
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const columns: ColumnsType<IPerson> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: IPerson) => (
                <button style={buttonStyle} onClick={() => showModal(record)}>
                    {text}
                </button>
            ),
        },
        {
            title: 'Year birthday',
            dataIndex: 'birth_year',
            key: 'birth_year',
        },
    ]

    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.current) setCurrent(pagination.current)

        if (pagination.pageSize) setPageSize(pagination.pageSize)
    }

    useEffect(() => {
        const fetchPeople = async () => {
            setIsLoading(true) // Start loading
            try {
                const response = await axios.get(
                    `https://swapi.dev/api/people/?page=${current}&limit=${pageSize}`
                )
                setPeople(response.data.results)
                setTotal(response.data.count)
            } catch (error: any) {
                console.error('Error fetching data: ', error)
                notification.error({
                    message: 'Error fetching data',
                    description: error.response
                        ? error.response.data.message
                        : 'Failed to connect to server',
                    duration: 4.5,
                })
            } finally {
                setIsLoading(false) // End loading
            }
        }

        fetchPeople()
    }, [current, pageSize])

    useEffect(() => {
        const filtered = people.filter(
            (person: IPerson) =>
                person.name.toLowerCase().includes(searchText.toLowerCase()) ||
                person.birth_year
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
        )
        setFilteredData(filtered)
    }, [people, searchText])

    const handleSearch = (text: string) => {
        setSearchText(text)
    }

    return (
        <div style={{ width: '60%', margin: '20px auto' }}>
            <SearchBar onSearch={handleSearch} />
            <Spin spinning={isLoading} size="large" delay={500}>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ current, pageSize, total }}
                    onChange={handleTableChange}
                />
            </Spin>
            <Modal
                title="Person detail"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null} //remove standard button
            >
                <PersonDetail person={selectedPerson} />
            </Modal>
        </div>
    )
}

export default PeopleTable
