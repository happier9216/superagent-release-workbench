import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTasks } from '../src/seed-data.mjs';
import { filterTasks } from '../src/task-filter.mjs';

test('只看待处理应留下五项，排除已完成的 GitHub 项目', () => {
  const before = structuredClone(initialTasks);
  const visible = filterTasks(initialTasks, { onlyPending: true });
  assert.equal(visible.length, 5);
  assert.equal(visible.some(task => task.id === 'REL-006'), false);
  assert.deepEqual(initialTasks, before);
});
