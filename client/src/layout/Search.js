import React,{useState} from 'react'
import SearchIcon from "@material-ui/icons/Search";
import {Form,Button} from 'react-bootstrap'
const Search = (props) => {
    const [keyword,setKeyword]=useState('')
    const submitHandler=(e) => {
        e.preventDefault()
            if (keyword.trim()) {
                props.history.push(`/query/${keyword}`);
            } else {
              props.history.push("/");
            }
    }
    return (
      <>
        <Form
          className="form-inline my-2 my-lg-0 mr-lg-3"
          onSubmit={submitHandler}
        >
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            name="query"
            onChange={(e)=>{setKeyword(e.target.value)}}
          />
          <Button className="btn btn-secondary my-2 my-sm-0" type="submit">
            <SearchIcon />
          </Button>
        </Form>
      </>
    );
}

export default Search
