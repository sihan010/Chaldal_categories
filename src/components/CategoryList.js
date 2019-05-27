import React, { Component } from 'react';
import categories from '../data/categories.json'
import CategoryListView from './CategoryListView'
import { makeCategoryTree, filterCategories } from '../Helper/Helper';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedList: null,
            searchTerm: ""
        }
    }

    componentDidMount() {
        let sortedList = makeCategoryTree(categories);
        this.setState({
            sortedList
        })
    }

    onSearchTermChange = (e) => {
        let value = e.target.value;
        this.setState({
            searchTerm: value
        })
        let filteredList = filterCategories(value);
        let sortedList = makeCategoryTree(filteredList);
        this.setState({
            sortedList
        })
    }

    render() {
        return (
            this.state.sortedList !== null ?
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ textAlign: 'center' }}>Chaldal Categories</h2>
                    <input
                        style={styles.searchBox}
                        type="text"
                        value={this.state.searchTerm}
                        placeholder="Search product category"
                        onChange={this.onSearchTermChange}
                    />
                    <ul style={{ float: 'left', textAlign: 'left', width:'100%' }}>
                        <CategoryListView categories={this.state.sortedList} />
                    </ul>
                </div>
                : <p>Sorry, No categories found !!</p>
        );
    }
}

const styles = {
    searchBox: {
        borderRadius: 10,
        padding: 5,
        height: '30px',
        width: '100%',
        fontFamily: "'Overlock', cursive",
        fontSize: 18,
        backgroundColor: '#D6EAF8'
    }
}

export default CategoryList;
