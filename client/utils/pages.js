export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages = 20, curPage = 1, implement = 2) => {
    let result = [];
    if(totalPages < implement*2 + 1) {
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1);
        }
    } else {
        if(curPage < implement*2) {
            for (let i = 0; i < curPage; i++) {
                result.push(i + 1);
            }
        } else {
            if(curPage + implement < totalPages) {
                for (let i = curPage-1 - implement; i < curPage; i++) {
                    result.push(i + 1);
                }
            }
            else {
                for (let i = curPage - implement*2+1; i < curPage; i++) {
                    result.push(i + 1);
                }
            }
            
        }
        
        
        if(curPage + implement <= totalPages) {
            if(curPage < implement*2) {
                for (let i = curPage; i < implement*2+1; i++) {
                    result.push(i + 1);
                }
            }
            else {
                for (let i = curPage; i < implement + curPage; i++) {
                    result.push(i + 1);
                }
            }
        }
    }
    
    let fpage = false;
    let lpage = false;

    if(result.indexOf(1) > -1) {
        fpage = false;
    } else {
        fpage = true;
    }
    
    if(result.indexOf(totalPages) > -1) {
        lpage = false;
    } else {
        lpage = true;
    }

    return [result, fpage, lpage];
    
}