import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'

const CategoryBar = observer(() => {
    const { catalog } = useContext(AppContext)
    // const catalog = {
    //     category: [
    //         {id: 1, name: "Серьги"},
    //         {id: 2, name: "Кольца"},
    //         {id: 3, name: "Колье"},
    //         {id: 4, name: "Броши"},
    //         {id: 5, name: "Браслеты"},
    //         {id: 6, name: "Ободки"},
    //     ],
    //     page: [1]
    // }
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === catalog.category) {
            catalog.category = null
        } else {
            catalog.category = id
        }
        // при каждом клике добавляем в историю браузера новый элемент
        const params = {}
        if (catalog.category) params.category = catalog.category
        if (catalog.page > 1) params.page = catalog.page
        navigate({
            pathname: '/',
            search: '?' + createSearchParams(params),
        })
    }

    return (
        <ListGroup>
            {catalog.categories.map(item =>
                <ListGroup.Item variant="dark"
                    key={item.id}
                    active={item.id === catalog.category}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default CategoryBar