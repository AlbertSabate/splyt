# Splyt test
Technical test


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites
* NodeJS
* Docker
* Yarn
* Chrome

*Last versions recommended*


### Running for development purposes
A step by step series of examples that tell you how to get a development env running.

```
make install
make start
```


### Running the tests with coverage
```
make test
```


## Deployment
To build the container for production use:
```
make build
```

When the build process finish, then we can test the result running this container:
```
make up
```

Finally, we can check the result:
[Splyt Test App](http://localhost)


## Built With
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Using Leaflet as a map tech, easy to use, well documented and huge community [Leaflet](https://leafletjs.com)
* This Component give me whatever I need, it is small and easy to implement. [RangeSlider](https://github.com/gilbarbara/react-range-slider)


## Author
* [Albert Sabate](https://github.com/AlbertSabate)


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
