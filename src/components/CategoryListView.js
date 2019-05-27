import React from 'react';
import { getDataFromId } from '../Helper/Helper'

const CategoryList = (props) => {
    let subCategory = props.categories;
    let view = Object.keys(subCategory).map((mc, mcKey) => {
        return (
            <li key={mcKey}>
                {getDataFromId(mc).Name}
                <ul>
                    {
                        Object.keys(subCategory[mc]).map((sc, scKey) => {
                            return (
                                <li key={scKey}>
                                    {getDataFromId(sc).Name}
                                    <ul>
                                        {
                                            subCategory[mc][sc].map((ssc, sscKey) => {
                                                return (
                                                    <li key={sscKey}>
                                                        {getDataFromId(ssc).Name}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            </li>
        )
    })
    return view;
}

export default CategoryList;