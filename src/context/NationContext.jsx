import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const NationContext = createContext();

export const NationProvider = ({ children }) => {
    const [groupNations, setGroupNations] = useState({});
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8081/api/blog/travel/list')
            .then(res => {
                const data = res.data;
                setAllItems(data);

                const grouped = data.reduce((acc, item) => {
                    if (!acc[item.nation]) acc[item.nation] = [];
                    acc[item.nation].push(item);
                    return acc;
                }, {});
                setGroupNations(grouped);
                setLoading(false);
            })
            .catch(err => {
                console.log(err, '데이터 로딩 실패!');
                setLoading(false);
            });

    }, []);

    return (
        <NationContext.Provider value={{ groupNations, allItems, loading }}>
            {children}
        </NationContext.Provider>
    );
};