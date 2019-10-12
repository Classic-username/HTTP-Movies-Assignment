import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = props => {
    const [movieInfo, setMovieInfo] = useState(
        {
        id: props.match.params.id,
        title: '',
        director: '',
        metascore: '',
        stars: [''],
      }
    )

    

    // console.log(props.match.params.id)

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;

        setMovieInfo({
            ...movieInfo,
            [e.target.name]:value
        })
        if(e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }
    }

    const handleStarsInput = (e, index) => {
        const tempArr = movieInfo.stars;
        tempArr[index] = e.target.value;
        setMovieInfo({...movieInfo, [e.target.name]: tempArr})
    }

    const handleSubmit = e => {
        // e.stars = e.stars.split(',').arrayFrom()
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}/`, movieInfo)
            .then(res => props.history.push(`/movies/${props.match.params.id}`))
            .catch(err => console.log(err))
    }
    const addPerson = e => {
        setMovieInfo({...movieInfo,
        stars: movieInfo.stars.concat([''])})
    }

    const deletePerson = star => {
        setMovieInfo({...setMovieInfo,
        stars: movieInfo.stars.filter(delStar => delStar !== star)
        })
    }

    return (
        <div>
            <h2>Update movie info</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={movieInfo.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='director'
                    value={movieInfo.director}
                />
                <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='metascore'
                    value={movieInfo.metascore}
                />
                {
                    movieInfo.stars.map((star, index) => {
                        return( <div key={index}>
                            <input
                                type='text'
                                name='stars'
                                value={star}
                                onChange={(e) => handleStarsInput(e, index)}
                                placeholder='stars'
                                required/>
                                <button type='button' onClick={() => deletePerson(star)}>-</button>
                        </div>)
                    })
                }
                <button type='button' onClick={addPerson}>+</button>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie