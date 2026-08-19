package com.smartclass.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "establishments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Establishment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;
    private String email;

    private String databaseHost;
    private Integer databasePort;
    private String databaseName;
    private String databaseUsername;
    private String databasePassword;
}