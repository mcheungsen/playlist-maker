-- Création de la table de test
CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT
);

-- Insertion de données dans la table
INSERT INTO test_table (name, age) VALUES
    ('John Doe', 30),
    ('Jane Smith', 25);