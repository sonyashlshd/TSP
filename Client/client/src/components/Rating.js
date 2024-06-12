import { Container, Radio, Rating } from "./RatingStyles";
import {useState} from "react";
import {FaStar} from "react-icons/fa";
import {createProdRating} from "../http/catalogAPI";

const Rate = () => {
    const [rate, setRate] = useState(0);
    return (
        <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                setRate(givenRating);
                            }}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "000"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    );
};

export default Rate;