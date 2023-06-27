import React from "react";

export const ModalContext = React.createContext({
  selectedMovie: null,
  setSelectedMovie: () => {},
  selectedMovieDetail: null,
  setSelectedMovieDetail: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  fetchMovieDetail: () => {},
  toggleModal: () => {},
  detailLoading: false,
  setDetailLoading: () => {},
});
