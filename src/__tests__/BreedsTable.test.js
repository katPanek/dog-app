import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BreedsTable } from '../routes/BreedsTable';
import { debug } from 'jest-preview';
import { MemoryRouter } from 'react-router-dom';

const mockBreed = {
  id: 0,
  name: 'Beagle',
  life_span: '13 - 16 years',
  temperament: 'Goofy',
};

beforeEach(() => {
  jest.spyOn(window, 'fetch').mockReturnValue(
    Promise.resolve({
      headers: { get: () => 1 },
      ok: true,
      json: () => Promise.resolve([mockBreed]),
    }),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('BreedsTable integration test', () => {
  test('should display breeds in the table', async () => {
    render(
      <MemoryRouter>
        <BreedsTable />
      </MemoryRouter>,
    );

    await waitForElementToBeRemoved(screen.getByTestId('breeds-table-loader'));

    debug();

    expect(screen.getByText('Beagle')).toBeInTheDocument();
    expect(screen.getByText('13 - 16 years')).toBeInTheDocument();
    expect(screen.getByText('Goofy')).toBeInTheDocument();
  });
});
