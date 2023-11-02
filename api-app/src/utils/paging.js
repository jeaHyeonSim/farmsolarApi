class paging {
    constructor(){
        this.total=0;                                                   // 전체 글의 행의 수
        this.currentPage=1;                                             // 현재 페이지 번호
        this.totalPages=1;                                              // 전체 페이지 개수
        this.startPage=1;                                               // 시작 페이지 번호
        this.endPage=1;                                                 // 종료 페이지 번호
        this.size=10                                                    // 게시물의 개수, 수정가능
        this.pagingCount=10;                                            // 페이징의 개수, 수정가능
        this.startDate='';                                              // 검색 시작일
        this.endDate='';                                                // 검색 종요일
		this.pageMove ='';												// 페이지 pre, next
    }
    calcPaging(total, size, pagingCount) {
        this.total = total;                                         // 전체 글의 행의 수
        this.size = size;                                           // 게시물의 개수
        this.pagingCount = pagingCount;                             // 페이징의 개수

        if(total == 0) { 
			this.totalPages = 0;
			this.startPage = 0;
			this.endPage = 0;
		} else { 
			// totalPages
			this.totalPages = parseInt(total / size);
			if(total % size > 0) {
				this.totalPages++;
			}

			// next pre 체크
			this.checkPreNextPage();

            // startPage
			this.startPage = (parseInt(this.currentPage / this.pagingCount) * this.pagingCount) + 1;
			if(this.currentPage % this.pagingCount == 0) {
				this.startPage -= pagingCount;
			}

			// endPage  
			this.endPage = this.startPage + this.pagingCount - 1 ;
			if(this.endPage >= this.totalPages) {
				this.endPage = this.totalPages;
			}

			// next btn check
			if(this.currentPage > this.endPage) this.currentPage = this.endPage;
		}
    }
	checkPreNextPage() {
		if(this.pageMove == "pre") {
			// 이전단계 startpage
			let calMovePage = parseInt(this.currentPage) - this.pagingCount;
			if(calMovePage <= 0) calMovePage = 1;
			this.currentPage = (parseInt((calMovePage) / this.pagingCount) * this.pagingCount) + 1;
		} else if(this.pageMove == "next") {
			// 다음단계 endpage
			let calMovePage = parseInt(this.currentPage) + this.pagingCount;
			if(calMovePage >= this.totalPages) {
				calMovePage = this.totalPages;
			}
			this.currentPage = (parseInt((calMovePage) / this.pagingCount) * this.pagingCount) + 1;
		}
	}
    pageingMapping(query) {
		this.currentPage = parseInt(query.currentPage);
		if(isNaN(this.currentPage)) this.currentPage = 1;
        this.startDate = query.startDate;
        this.endDate = query.endDate;
		this.pageMove = query.pageMove;
    }

	// 전체 행의 수를 리턴
	getTotal() {
		return this.total;
	}
	// 현재 페이지 번호 리턴
	getCurrentPage() {
		return this.currentPage;
	}
	// 전체 페이지의 개수 리턴
	getTotalPages() {
		return this.totalPages <= 0 ? 1 : this.totalPages;
	}
	// 목록 하단의 시작 번호를 리턴
	getStartPage() {
		return this.startPage <= 0 ? 1 : this.startPage;
	}
	// 목록 하단의 종료 번호를 리턴
	getEndPage() {
		return this.endPage <= 0 ? 1: this.endPage;
	}        
    // 페이징의 개수
    getPagingCount() {
        return this.pagingCount;
    }
	getSize() {
		return this.size;
	}
    getStartDate(){
        return this.startDate;
    }
    getEndDate(){
        return this.endDate;
    }
}

module.exports = paging;