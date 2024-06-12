import { Button } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { CDBIcon } from 'cdbreact';
import { BsTrash3 } from "react-icons/bs";

const BasketItem = (props) => {
    return (
        <tr>
            <td className="align-middle">{props.name}</td>
            <td className="text-center align-middle">
                <Button variant="outline-dark" size="sm" className={"float-start"} onClick={() => props.decrement(props.id)}>-</Button>
                {' '}<strong>{props.quantity}</strong>{' '}
                <Button variant="outline-dark" size="sm" className={"float-end"} onClick={() => props.increment(props.id)}>+</Button>
            </td>
            <td className="align-middle">{props.price}</td>
            <td className="align-middle">{props.price * props.quantity}</td>
            <td className="text-center align-middle">
                <Button variant = "outline-danger"  onClick={() => props.remove(props.id)}>
                    <BsTrash3 />
                </Button>
            </td>
        </tr>
    )
        ;
}

export default BasketItem