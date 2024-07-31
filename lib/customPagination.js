import React from "react";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";

function CustomPagination(props) {
  const dispatch = useDispatch();
  const {
    onPageChange,
    className,
    total,
    getData,
    currentPage,
    pagefor,
    type,
    typearg,
    status,
    search,
    editId,
    handleCancelClick,
    is_active,
    params,
  } = props;
  const CustomPaginationRoot = styled("div")(({ theme }) => ({
    "& .MuiDataGrid-footerConentair": {
      border: "none !important",
    },
    "& .Mui-selected": {
      background: theme.palette.primary.bggradient,
      color: theme.palette.primary.contrastText + "!important",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "& .MuiPaginationItem-root": {
      color: theme.palette.text.primary,
      background: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },

    "& .MuiPaginationItem-root.Mui-disabled": {
      color: theme.palette.text.disabled,
    },
  }));
  
  const handlePageChange = async (event, newPage) => {
    const pageNumber = newPage;
    onPageChange(event, pageNumber);
    if (pagefor === "classlist") {
      console.log("first", pageNumber);
      dispatch(
        getData({
          data: {
            search: search ?? null,
            status: status ?? null,
            is_active: is_active ?? null,
            pagenumber: pageNumber,
          },
          type: type ?? null,
          pagenumber: pageNumber ?? 1,
        })
      );
    } else if (typearg === "student") {
      dispatch(
        getData({
          data: {
            search: search ?? null,
            status: status ?? null,
            is_active: is_active ?? null,
            pagenumber: pageNumber,
          },
          pagenumber: pageNumber,
        })
      );
    } else {
      dispatch(
        getData({
          data: {
            search: search ?? null,
            status: status ?? null,
            is_active: is_active ?? null,
            pagenumber: pageNumber ?? 1,
          },
          pageNumber: pageNumber ?? 1,
        })
      );
    }
  };

  return (
    <CustomPaginationRoot className={`${className} custom-pagination`}>
      <Pagination
        count={total}
        total
        size="large"
        page={currentPage}
        onChange={(event, newPage) => {
          handlePageChange(event, newPage);
          handleCancelClick(editId);
        }}
      />
    </CustomPaginationRoot>
  );
}

export default CustomPagination;
