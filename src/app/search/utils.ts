import { EFiltersAction, TFiltersReducer } from './Search.types';

export const filtersReducer: TFiltersReducer = (draft, action) => {
  switch (action.type) {
    case EFiltersAction.Show:
      draft.visible = true;
      draft.filtersChanged = false;
      break;
    case EFiltersAction.Hide:
      draft.visible = false;
      break;
    case EFiltersAction.Include:
      if (action.payload) {
        const { id, name } = action.payload;
        draft.include[id] = name;
        draft.filtersChanged = true;
      } else {
        console.error(`Payload not send in action "${EFiltersAction.Include}" in filtersReducer.`);
      }
      break;
    case EFiltersAction.Clear:
      draft.include = {};
      draft.filtersChanged = true;
      break;
    default: // Nothing
  }

  return draft;
};
