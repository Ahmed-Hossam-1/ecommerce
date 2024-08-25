CREATE TABLE SELLER_REQUEST(
      id        VARCHAR PRIMARY KEY,
      userId    VARCHAR NOT NULL,
      name      VARCHAR NOT NULL,
      email     VARCHAR NOT NULL UNIQUE,
      password  VARCHAR NOT NULL,
      status    VARCHAR NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CATEGORIES (
    categoryId VARCHAR PRIMARY KEY,
    categoryName VARCHAR NOT NULL,
    categoryDescription VARCHAR NOT NULL
);

CREATE TABLE PRODUCTS (
    id               VARCHAR PRIMARY KEY,
    name             VARCHAR NOT NULL,
    description      VARCHAR NOT NULL,
    price            VARCHAR NOT NULL,
    quantity         VARCHAR NOT NULL,
    mainImage        VARCHAR NOT NULL,
    images           VARCHAR NOT NULL,
    categoryId       VARCHAR NOT NULL,
    sellerId         VARCHAR NOT NULL,

    FOREIGN KEY (categoryId) REFERENCES CATEGORIES (categoryId),
    FOREIGN KEY (sellerId) REFERENCES USER (id)
);

