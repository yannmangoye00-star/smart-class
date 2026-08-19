package com.smartclass.config;

import com.smartclass.tenant.TenantContext;
import com.smartclass.tenant.TenantDataSourceManager;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataSourceConfig {

    // 1. Instancier la DataSource de base avec le DataSourceProperties géré par Spring Boot
    @Bean
    public DataSource defaultDataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }

    // 2. RoutingDataSource principal avec @Primary
    @Bean
    @Primary
    public DataSource dataSource(@Lazy TenantDataSourceManager tenantDataSourceManager, DataSource defaultDataSource) {
        AbstractRoutingDataSource routingDataSource = new AbstractRoutingDataSource() {
            @Override
            protected Object determineCurrentLookupKey() {
                return TenantContext.getCurrentTenant();
            }
        };

        Map<Object, Object> targetDataSources = new HashMap<>();

        if (tenantDataSourceManager.getAllDataSources() != null) {
            targetDataSources.putAll(tenantDataSourceManager.getAllDataSources());
        }

        targetDataSources.put("default", defaultDataSource);

        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.setDefaultTargetDataSource(defaultDataSource);
        routingDataSource.afterPropertiesSet();

        return routingDataSource;
    }
}