import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($shipTo: String!, $shipToAddress: String!, $message: String, $products: [ID]!) {
    addOrder(shipTo: $shipTo, shipToAddress: $shipToAddress, message: $message, products: $products) {
      purchaseDate
      shipTo
      shipToAddress
      message
      products {
        _id
        name
        description
        price
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser(
    $password: String!
  ) {
    deleteUser(
      password: $password
    ) {
      user {
        _id
      }
    }
  }
`;
