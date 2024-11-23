import React from 'react';

//create a context object
	//a context object is a data type of an object that can be used to store information that can be shared to other components within the app

const UserContext = React.createContext();

//The provider component allows other components to consume or use the context object and supply the necessary information needed to the context object

export const UserProvider = UserContext.Provider;

export default UserContext;