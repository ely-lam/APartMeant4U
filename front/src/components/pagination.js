import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
//Argument must for components
//pages which is Total number of pages possible
//currentpage which is selected page right now

//Three Functions
//Hundread Change (when +100 or -100 is clicked)
//Ten Change (When +10 or -10 is clicked)
//nextPage (when from options any page is selected)

const PaginationPage = (props) => {
  console.log("Rendering Inside paginationPage");
  console.log("Props Received ", props)
  const pageLinks = [];
  //let pagesDisplay = props.currentPage + 10;
  let start = (props.currentPage) - (props.currentPage%10);
  if(start <= 0)
    start = 1;
  for (let i = start; i <= start + 11 && i <= props.pages; i++) {
    pageLinks.push(
      <PaginationItem active={props.currentPage === i}>
        <PaginationLink onClick={() => props.nextPage(i)}>
          {i}
        </PaginationLink>
      </PaginationItem>
    )
  }

  return (
    <Pagination aria-label="Page navigation example" className="paginationcss">
      {
        props.currentPage > 100 &&
        <PaginationItem >
          <PaginationLink className="addbuttons" onClick={() => props.hundredChange(props.currentPage,-1)}>
            - 100
          </PaginationLink>
        </PaginationItem>
      }
      {
        props.currentPage > 10 &&
        <PaginationItem>
          <PaginationLink className="addbuttons" onClick={() => props.tenChange(props.currentPage,-1)} >
            - 10
          </PaginationLink>
        </PaginationItem>
      }
      {pageLinks}
      {
        (props.currentPage + 10) < props.pages &&
        <PaginationItem>
          <PaginationLink className="addbuttons" onClick={() => props.tenChange(props.currentPage,1)} >
            + 10
          </PaginationLink>
        </PaginationItem>
      }
      {
        (props.currentPage + 100) < props.pages &&
        <PaginationItem>
          <PaginationLink className="addbuttons" onClick={() => props.hundredChange(props.currentPage,1)} >
            + 100
          </PaginationLink>
        </PaginationItem>
      }
    </Pagination>
  )
}
export default PaginationPage;