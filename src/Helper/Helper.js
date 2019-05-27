import categories from '../data/categories.json'

const makeCategoryTree = (categoriesList) => {
    let parentCategory = [];
    let subCategory = {};

    for (let i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].ParentCategoryId === 0) {
            parentCategory.push(categoriesList[i]);
        }
    }
    
    for (let i = 0; i < parentCategory.length; i++) {
        let subCats = {};
        for (let j = 0; j < categoriesList.length; j++) {
            if (categoriesList[j].ParentCategoryId === parentCategory[i].Id) {
                subCats[categoriesList[j].Id] = [];
            }
        }
        for (let j = 0; j < Object.keys(subCats).length; j++) {
            let key = Object.keys(subCats)[j];
            for (let k = 0; k < categoriesList.length; k++) {
                if (categoriesList[k].ParentCategoryId === Number.parseInt(key)) {
                    subCats[key].push(categoriesList[k].Id);
                }
            }
        }
        subCategory[parentCategory[i].Id] = subCats;
    }
    return subCategory;
}

const getDataFromId = (id) => {
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].Id === Number.parseInt(id))
            return categories[i];
    }
}

const filterCategories = (keyword) => {
    let parentCategory = [];
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].ParentCategoryId === 0) {
            parentCategory.push(categories[i]);
        }
    }

    let filteredCategories = categories.filter((element) => {
        return !parentCategory.includes(element) &&
            element.Name.toLowerCase().includes(keyword.toLowerCase());
    })

    let subCategory = [];
    for (let i = 0; i < filteredCategories.length; i++) {
        let sub = getDataFromId(filteredCategories[i].ParentCategoryId);
        if (!subCategory.includes(sub) && !parentCategory.includes(sub))
            subCategory.push(sub);
    }
    let filtered = [...parentCategory, ...filteredCategories, ...subCategory];
    //console.log(filtered);
    return filtered;
}

export { makeCategoryTree, getDataFromId, filterCategories }