import { EFiltersAction, TFiltersReducer } from './Search.types';

export const filtersReducer: TFiltersReducer = (draft, action) => {
  const generatefilterChangeKey = () => Math.random().toString(36).slice(2);

  switch (action.type) {
    case EFiltersAction.Show:
      draft.visible = true;
      draft.filtersChanged = Math.random().toString(36).slice(2);
      break;
    case EFiltersAction.Hide:
      draft.visible = false;
      break;
    case EFiltersAction.Include:
      if (action.payload && typeof action.payload === 'object') {
        const { id, name } = action.payload;
        draft.include[id] = name;
        draft.filtersChanged = generatefilterChangeKey();
      } else {
        console.error(
          `Payload not sent / incorrecy payload type in action "${EFiltersAction.Include}" in filtersReducer.`,
        );
      }
      break;
    case EFiltersAction.Exclude:
      if (action.payload && typeof action.payload === 'string') {
        delete draft.include[action.payload];
        draft.filtersChanged = generatefilterChangeKey();
      } else {
        console.error(
          `Payload not sent / incorrecy payload type in action "${EFiltersAction.Include}" in filtersReducer.`,
        );
      }
      break;
    case EFiltersAction.Clear:
      draft.include = {};
      draft.filtersChanged = generatefilterChangeKey();
      break;
    default: // Nothing
  }

  return draft;
};
