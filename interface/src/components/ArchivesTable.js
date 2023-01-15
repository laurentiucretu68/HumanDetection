import {Button, Container, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "react-bootstrap/Spinner";

function ArchivesTable() {
    const email = sessionStorage.getItem('user')
    const [archives, setArchives] = useState([])
    const [message, setMessage] = useState('')
    const [wait, setWait] = useState(false)
    const [error, setError] = useState('')
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        (async function getBooks() {
            setSpinner(true)
            try {
                const {data} = await axiosInstance().get(`/archive/list/${email}`)
                console.log(data)
                setArchives(data)
            } catch (err) {
                console.error(err)
            }
            setSpinner(false)
        })()
    }, [])

    const handleDelete = async (filename) => {
        setWait(true)
        try {
            const {status} = await axiosInstance().delete(`/archive/delete/${email}/${filename}`)
            if (status === 200) {
                setArchives(archives.filter(archive => archive[0] !== filename))
                setMessage(`Archive with ${filename} name was successfully removed!`)
                setTimeout(() => setMessage(''), 3000)
            } else {
                setError(`Archive with ${filename} not found`)
                setTimeout(() => setError(''), 3000)
            }

        } catch (err) {
            setError(`Server error`)
            setTimeout(() => setError(''), 3000)
        }
        setWait(false)
    }

    const handleDownload = async (filename) => {
        setWait(true)
        try {
            const {status, data} = await axiosInstance().get(`/archive/get/${email}/${filename}`,
                {responseType: 'arraybuffer'})

            if (status === 200) {
                const url = window.URL.createObjectURL(new Blob([data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', filename)
                document.body.appendChild(link)
                link.click()
            } else {
                setError(`Archive couldn't be downloaded`)
                setTimeout(() => setError(''), 3000)
            }
        } catch (err) {
            setError(`Server error`)
            setTimeout(() => setError(''), 3000)
        }
        setWait(false)
    }

    return (
        <>
            {
                archives.length > 0 ?
                    <Container style={{paddingTop: '50px'}}>
                        {
                            error ?
                                <div className="error">
                                    <p>
                                        {error}
                                        <span className="closeNotification closeNotification2"
                                              onClick={() => setError('')}>x</span>
                                    </p>
                                </div> : null
                        }
                        {
                            message ?
                                <div className="message">
                                    <p>
                                        {message}
                                        <span className="closeNotification closeNotification2"
                                              onClick={() => setMessage('')}>x</span>
                                    </p>
                                </div> : null
                        }
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                archives.map((archive, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{archive[0]}</td>
                                        <td>{archive[1]}</td>
                                        <td style={{textAlign: "center"}}><Button className="delete-button"
                                                                                  onClick={() => handleDelete(archive[0])}>Delete</Button>
                                        </td>
                                        <td style={{textAlign: "center"}}><Button className="download-button"
                                                                                  onClick={() => handleDownload(archive[0])}>Download</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                        {
                            wait ?
                                <>
                                    <div className="spinner-container">
                                        <Spinner animation="border" role="status" className="spinner">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                </>
                                : null
                        }
                    </Container>
                    : spinner ?
                        <div className="d-flex align-items-center justify-content-center vh-100" style={{marginTop: -20}}>
                            <Spinner animation="border" role="status" className="spinner">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    :
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="text-center">
                            <p className="fs-3"><span className="text-danger">Opps!</span> No archives found</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default ArchivesTable;