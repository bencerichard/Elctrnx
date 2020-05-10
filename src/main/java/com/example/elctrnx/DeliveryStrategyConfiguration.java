package com.example.elctrnx;

import com.example.elctrnx.strategies.DeliveryStrategyInterface;
import com.example.elctrnx.strategies.MostAbundantStrategy;
import com.example.elctrnx.strategies.SingleLocationStrategy;
import com.example.elctrnx.strategies.StrategyEnum;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DeliveryStrategyConfiguration {

    @Value("${strategy}")
    private String strategy;

    @Bean
    public DeliveryStrategyInterface getDeliveryStrategy() {

        if (this.testIfValueIsFromEnum()) {
            StrategyEnum strategyValue = StrategyEnum.valueOf(strategy.toUpperCase());
            if (strategyValue == StrategyEnum.SINGLE_LOCATION) {
                return new SingleLocationStrategy();
            }
        }
        return new MostAbundantStrategy();
    }

    public boolean testIfValueIsFromEnum() {
        for (StrategyEnum strategyEnum : StrategyEnum.values())
            if (strategyEnum.name().equals(strategy.toUpperCase())) {
                return true;
            }
        return false;
    }
}



