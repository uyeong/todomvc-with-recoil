import { renderHook, act,  } from '@testing-library/react-hooks';
import { default as OriginalUseTodoList} from './useTodoList';
import { RecoilRoot } from 'recoil';

jest.spyOn(window.localStorage.__proto__, 'getItem');

const getItem = window.localStorage.getItem as jest.Mock;
const dummy = [
  { id: "a", title: "title", completed: false },
  { id: "b", title: "title", completed: false },
  { id: "c", title: "title", completed: false },
];

describe('useTodoList', () => {
  beforeEach(() => {
    getItem.mockReturnValueOnce(JSON.stringify(dummy));
  });

  afterAll(() => {
    getItem.mockRestore();
  });

  test('Get initial state ', () => {
    const { result } = renderedUseTodoList();
    expect(result.current.todoList).toHaveLength(3);
    expect(result.current.todoList[0]).toEqual(dummy[0]);
    expect(result.current.todoList[1]).toEqual(dummy[1]);
    expect(result.current.todoList[2]).toEqual(dummy[2]);
  })

  test('Add a new todo', () => {
    const { result } = renderedUseTodoList();
    act(() => result.current.addTodo('new'));
    expect(result.current.todoList).toHaveLength(4);
    expect(result.current.todoList[3].id.length).toBeGreaterThan(0);
    expect(result.current.todoList[3].title).toEqual('new')
    expect(result.current.todoList[3].completed).toEqual(false);
  });

  test('Add a empty todo', () => {
    const { result } = renderedUseTodoList();
    expect(() => result.current.addTodo(''))
      .toThrow('빈 문자열로 생성할 수 없습니다.');
  });
});

function renderedUseTodoList() {
  return renderHook(() => OriginalUseTodoList(), {
    wrapper: RecoilRoot
  });
}
