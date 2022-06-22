import { Pagination } from 'react-bootstrap';

export const TablePagination = ({
  recordsTotal,
  onPageChange,
  page,
  pageSize = 10,
}) => {
  const pagesTotal = Math.floor((recordsTotal + pageSize - 1) / pageSize);

  return (
    <Pagination className="justify-content-end">
      <Pagination.First disabled={page <= 0} onClick={() => onPageChange(0)} />
      <Pagination.Prev
        disabled={page <= 0}
        onClick={() => onPageChange(page - 1)}
      />
      {page > 2 && (
        <Pagination.Item onClick={() => onPageChange(0)}>{1}</Pagination.Item>
      )}
      {page > 3 && (
        <Pagination.Ellipsis
          data-testid={'pagination-ellipsis-left'}
          disabled
        />
      )}
      {page > 1 && (
        <Pagination.Item onClick={() => onPageChange(page - 2)}>
          {page - 1}
        </Pagination.Item>
      )}
      {page > 0 && (
        <Pagination.Item onClick={() => onPageChange(page - 1)}>
          {page}
        </Pagination.Item>
      )}
      <Pagination.Item active onClick={() => onPageChange(page)}>
        {page + 1}
      </Pagination.Item>
      {page < pagesTotal - 1 && (
        <Pagination.Item onClick={() => onPageChange(page + 1)}>
          {page + 2}
        </Pagination.Item>
      )}
      {page < pagesTotal - 2 && (
        <Pagination.Item onClick={() => onPageChange(page + 2)}>
          {page + 3}
        </Pagination.Item>
      )}
      {page < pagesTotal - 4 && (
        <Pagination.Ellipsis
          data-testid={'pagination-ellipsis-right'}
          disabled
        />
      )}
      {page < pagesTotal - 3 && (
        <Pagination.Item
          data-testid={'pagination-page-last-number'}
          onClick={() => onPageChange(pagesTotal - 1)}>
          {pagesTotal}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={page >= pagesTotal - 1}
        onClick={() => onPageChange(page + 1)}
      />
      <Pagination.Last
        data-testid={'pagination-page-last'}
        disabled={page >= pagesTotal - 1}
        onClick={() => {
          onPageChange(pagesTotal - 1);
        }}
      />
    </Pagination>
  );
};
