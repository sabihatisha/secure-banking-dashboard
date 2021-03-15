import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'
import Axios from 'axios'
import { api } from '../../../utils/api'
import DataTable from '../../../components/dataTable/client'
import LoadingComponent from '../../../components/loading/Index'

const Index = () => {
    const [isLoading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    // Get Items 
    const getItems = useCallback(async () => {
        try {
            const response = await Axios.get(`${api}admin/allclient`,header)
            console.log(response)
            if (response.status === 200) {
                setItems(response.data.findAllClient)
                setLoading(false)
            }
        } catch (error) {
            if (error) {
                console.log(error.response)
            }
        }
    }, [header])


    useEffect(() => {
        getItems()
    }, [header,getItems])

    return (
        <div className="category-index">

            {/* if loading to fetch data */}
            {isLoading ? <LoadingComponent /> : null}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-padding">
                        <div className="card border-0 shadow-sm">

                            {/* Data table component for show data */}
                            <DataTable items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;