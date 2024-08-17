CREATE TABLE SELLER_REQUEST (
    requestId  VARCHAR PRIMARY KEY,
    requestDate DATE NOT NULL,
    sellerName VARCHAR NOT NULL,
    sellerEmail VARCHAR NOT NULL,
    sellerPhone VARCHAR NOT NULL
);

CREATE TABLE CATEGORIES (
    categoryId VARCHAR PRIMARY KEY,
    categoryName VARCHAR NOT NULL,
    categoryDescription VARCHAR NOT NULL
);

CREATE TABLE PRODUCTS (
    productId               VARCHAR PRIMARY KEY,
    productName             VARCHAR NOT NULL,
    productDescription      VARCHAR NOT NULL,
    productPrice            VARCHAR NOT NULL,
    productQuantity         VARCHAR NOT NULL,
    productMainImage        VARCHAR NOT NULL,
    productImages           VARCHAR NOT NULL,
    categoryId              VARCHAR NOT NULL,
    sellerId                VARCHAR NOT NULL,

    FOREIGN KEY (categoryId) REFERENCES CATEGORIES (categoryId),
    FOREIGN KEY (sellerId) REFERENCES USER (id)
);

