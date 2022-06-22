import { render, screen, fireEvent } from '@testing-library/react';
import { TablePagination } from '../components/TablePagination';
import { debug } from 'jest-preview';

describe('TablePagination', () => {
  test('should render one page for records total 9', () => {
    render(<TablePagination page={0} recordsTotal={9} />);

    debug();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('1').closest('li')).toHaveClass('active');
  });

  test('should render one page for records total 10', () => {
    render(<TablePagination page={0} recordsTotal={10} />);

    debug();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  test('should render two pages for records total 11', () => {
    render(<TablePagination page={0} recordsTotal={11} />);

    debug();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('should disable previous and first buttons for page 0', () => {
    render(<TablePagination page={0} recordsTotal={10} />);

    debug();
    
    expect(screen.getByText('‹').closest('li')).toHaveClass('disabled');
    expect(screen.getByText('«').closest('li')).toHaveClass('disabled');
  });

  test('should add active class to second page button on page 1', () => {
    render(<TablePagination page={1} recordsTotal={11} />);
    
    debug();
    
    expect(screen.getByText('2').closest('li')).toHaveClass('active');
  });

  test('should disable next and last buttons on last page', () => {
    render(<TablePagination page={1} recordsTotal={11} />);
    
    debug();

    expect(screen.getByText('›').closest('li')).toHaveClass('disabled');
    expect(screen.getByText('»').closest('li')).toHaveClass('disabled');
  });

  test('should go to last page on last page button click', () => {
    const actionSpy = jest.fn();
    render(
      <TablePagination page={0} recordsTotal={11} onPageChange={actionSpy} />,
    );

    fireEvent.click(screen.getByTestId('pagination-page-last'));
    
    debug();

    expect(actionSpy).toBeCalledWith(1);
  });

  test('should go to last page on last page number button click', () => {
    const actionSpy = jest.fn();
    render(
      <TablePagination page={0} recordsTotal={51} onPageChange={actionSpy} />,
    );

    fireEvent.click(screen.getByTestId('pagination-page-last-number'));
    
    debug();

    expect(actionSpy).toBeCalledWith(5);
  });

  test('should show right ellipsis item when there are more than 5 pages on first page', () => {
    render(<TablePagination page={0} recordsTotal={50} />);

    debug();
    
    expect(screen.getByTestId('pagination-ellipsis-right')).toBeInTheDocument();
  });

  test('should show left ellipsis item when there are more than 5 pages on page 5', () => {
    render(<TablePagination page={4} recordsTotal={61} />);

    debug();
    
    expect(screen.getByTestId('pagination-ellipsis-left')).toBeInTheDocument();
  });

  test('should not show left ellipsis item when on page 4', () => {
    render(<TablePagination page={3} recordsTotal={50} />);

    debug();
    
    expect(screen.queryByTestId('pagination-ellipsis-left')).not.toBeInTheDocument();
  });

  test('should show left ellipsis item on page 5', () => {
    render(<TablePagination page={4} recordsTotal={50} />);

    debug();

    expect(screen.getByTestId('pagination-ellipsis-left')).toBeInTheDocument();
  });

  test('should show left ellipsis item on page 5', () => {
    render(<TablePagination page={4} recordsTotal={50} />);

    debug();
    expect(screen.getByTestId('pagination-ellipsis-left')).toBeInTheDocument();
  });
});
