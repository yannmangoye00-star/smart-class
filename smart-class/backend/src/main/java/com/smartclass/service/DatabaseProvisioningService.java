package com.smartclass.service;

import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Service
public class DatabaseProvisioningService {

    private final DataSource dataSource;

    public DatabaseProvisioningService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void createDatabase(String databaseName) {

        validateDatabaseName(databaseName);

        String sql = "CREATE DATABASE " + databaseName;

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.executeUpdate();

        } catch (SQLException exception) {

            if (isDatabaseAlreadyExists(exception)) {
                return;
            }

            throw new IllegalStateException(
                    "Unable to create database: " + databaseName,
                    exception
            );
        }
    }

    private void validateDatabaseName(String databaseName) {

        if (databaseName == null || databaseName.isBlank()) {
            throw new IllegalArgumentException(
                    "Database name cannot be empty"
            );
        }

        if (!databaseName.matches("[a-zA-Z0-9_]+")) {
            throw new IllegalArgumentException(
                    "Invalid database name: " + databaseName
            );
        }
    }

    private boolean isDatabaseAlreadyExists(SQLException exception) {

        String message = exception.getMessage();

        return message != null
                && message.toLowerCase().contains("already exists");
    }
}