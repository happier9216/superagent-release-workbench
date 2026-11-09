import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTasks } from '../src/seed-data.mjs';
import { filterTasks, updateTaskStatus } from '../src/task-filter.mjs';

test('全部视图保留原来的六项任务', () => {
  assert.deepEqual(filterTasks(initialTasks), initialTasks);
});

test('搜索支持编号、首尾空格和大小写', () => {
  assert.deepEqual(filterTasks(initialTasks, { search: '  rel-003  ' }).map(task => task.id), ['REL-003']);
});

test('状态与优先级可以组合筛选', () => {
  assert.deepEqual(filterTasks(initialTasks, { status: 'in-progress', priority: 'high' }).map(task => task.id), ['REL-003']);
});

test('更新一项状态时不改变原数组或其他任务', () => {
  const before = structuredClone(initialTasks);
  const updated = updateTaskStatus(initialTasks, 'REL-001', 'review');
  assert.equal(updated.find(task => task.id === 'REL-001').status, 'review');
  assert.deepEqual(updated.slice(1), initialTasks.slice(1));
  assert.deepEqual(initialTasks, before);
});

test('未知状态不会写入任务', () => {
  assert.throws(() => updateTaskStatus(initialTasks, 'REL-001', 'unknown'), /任务状态不正确/);
});
