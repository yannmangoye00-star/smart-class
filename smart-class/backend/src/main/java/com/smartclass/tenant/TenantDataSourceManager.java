package com.smartclass.tenant;

import com.smartclass.repository.EstablishmentRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TenantDataSourceManager {

    private final EstablishmentRepository establishmentRepository;
    private final Map<String, DataSource> dataSources = new ConcurrentHashMap<>();

    // L'annotation @Lazy sur le paramètre casse la boucle de dépendance au démarrage
    public TenantDataSourceManager(@Lazy EstablishmentRepository establishmentRepository) {
        this.establishmentRepository = establishmentRepository;
    }

    public DataSource getDataSource(String tenantId) {
        if (tenantId == null) {
            return null;
        }
        return dataSources.get(tenantId);
    }

    public Map<String, DataSource> getAllDataSources() {
        return dataSources;
    }

    public void addDataSource(String tenantId, DataSource dataSource) {
        dataSources.put(tenantId, dataSource);
    }
}