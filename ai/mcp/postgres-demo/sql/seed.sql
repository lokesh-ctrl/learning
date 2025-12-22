-- Create a table for some sample data
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10, 2),
    stock_quantity INTEGER
);

-- Insert some dummy data
INSERT INTO
    products (name, price, stock_quantity)
VALUES
    ('Ergonomic Keyboard', 129.99, 25),
    ('Wireless Mouse', 45.00, 50),
    ('32-inch Monitor', 349.50, 10),
    ('USB-C Hub', 59.00, 100),
    ('Webcam 1080p', 89.99, 15);