package com.smartclass.tenant;

import com.smartclass.entity.Establishment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

public class TenantDataSource extends DriverManagerDataSource {

    private final String tenantCode;

    public TenantDataSource(Establishment establishment) {
        super();

        this.tenantCode = establishment.getCode();

        setDriverClassName("org.postgresql.Driver");

        setUrl(
            "jdbc:postgresql://"
                + establishment.getDatabaseHost()
                + ":"
                + establishment.getDatabasePort()
                + "/"
                + establishment.getDatabaseName()
        );

        setUsername(establishment.getDatabaseUsername());
        setPassword(establishment.getDatabasePassword());
    }

    public String getTenantCode() {
        return tenantCode;
    }
}