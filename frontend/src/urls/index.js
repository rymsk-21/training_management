const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

export const exercisesIndex = `${DEFAULT_API_LOCALHOST}/exercises`
export const trainingsIndex = (exercisesId) =>
    `${DEFAULT_API_LOCALHOST}/exercises/${exercisesId}/trainings`
export const lineMenus = `${DEFAULT_API_LOCALHOST}/line_menus`;
export const lineMenusReplace = `${DEFAULT_API_LOCALHOST}/line_menus/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;

