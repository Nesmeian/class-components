const base_url = 'https://api.rawg.io/api/games'; // Уточните конечную точку для игр
const api_key = '4c24dbd62ad84eed9e14525bfc95e6cd';
export default async function getGameData(searchGame: string) {
    const pageSize = 20;
    const url = `${base_url}?search=${searchGame}&page_size=${pageSize}&key=${api_key}`;

    try {
        const response = await fetch(url); // Отправляем запрос к API
        const root = document.getElementById('root');
        console.log(root);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`); // Обработка ошибок запроса
        }

        const data = await response.json(); // Получаем данные в формате JSON
        return data; // Возвращаем данные
    } catch (error) {
        console.error(error); // Выводим ошибку в консоль
        throw error; // Перебрасываем ошибку для дальнейшей обработки
    }
}
