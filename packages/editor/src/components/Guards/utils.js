import { isDef } from '../utils';

export const removeEmptyParams = ({ params = [], ...rest }) => {
  const newParams = params.filter(({ value }) => isDef(value));
  return { ...rest, ...(newParams.length && { params: newParams }) }
}
