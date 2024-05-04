import React, { useEffect, useState } from 'react'

const useProfile = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch("/api/profile")
            .then(response => response.json())
            .then(data => setData(data))
        setLoading(false)
    }, [])
    return { loading, data }
}

export default useProfile