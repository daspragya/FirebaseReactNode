import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../api";

const Title = styled.h1.attrs({
  className: "h1",
})``;

const Wrapper = styled.div.attrs({
  className: "form-group",
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control",
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`;

const ItemsUpdate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await api.getItemById(id);
        if (item) {
          setName(item.data.name);
          setDesc(item.data.desc);
          setPrice(item.data.price);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChangeInputDescription = (event) => {
    const desc = event.target.value;
    setDesc(desc);
  };

  const handleChangeInputPrice = (event) => {
    const price = event.target.value;
    setPrice(price);
  };

  const handleUpdateItem = async () => {
    try {
      const payload = { name, desc, price };
      await api.updateItemById(id, payload);
      window.alert("Item updated successfully");
      window.location.href = "/items/list";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Title>Update Item</Title>

      <Label>Name:</Label>
      <InputText type="text" value={name} />
      <Label>Description:</Label>
      <InputText
        type="text"
        value={desc}
        onChange={handleChangeInputDescription}
      />
      <Label>Price:</Label>
      <InputText
        type="number"
        value={price}
        onChange={handleChangeInputPrice}
      />

      <Button onClick={handleUpdateItem}>Update Item</Button>
      <CancelButton href="/items/list">Cancel</CancelButton>
    </Wrapper>
  );
};

export default ItemsUpdate;
