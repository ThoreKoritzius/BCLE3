
export const BusinessModelDimensions = {
    D1_HierarchicalImpact: {
        PrototypicalPattern: "Prototypical pattern",
        SolutionPattern: "Solution pattern",
    },
    D2_DegreeOfDigitization: {
        PurelyDigital: "Purely digital",
        DigitallyEnabled: "Digitally enabled",
        NotNecessarilyDigital: "Not necessarily digital",
    },
    D3_ProductType: {
        Physical: "Physical",
        Financial: "Financial",
        Human: "Human",
        IntellectualProperty: "Intellectual property",
        Hybrid: "Hybrid",
        ProductTypeNotSpecified: "Product type not specified",
    },
    D4_StrategyForDifferentiation: {
        Quality: "Quality",
        Customization: "Customization",
        Combination: "Combination",
        AccessConvenience: "Access/convenience",
        Price: "Price",
        NetworkEffects: "Network effects",
        NoImpactOnDifferentiation: "No impact on differentiation",
    },
    D5_TargetCustomers: {
        SpecificNewCustomerSegment: "Specific new customer segment",
        LockInExistingCustomers: "Lock-in existing customers",
        OtherCompaniesB2B: "Other companies (B2B)",
        NoImpactOnTargetCustomers: "No impact on target customers",
    },
    D6_ValueDeliveryProcess: {
        BrandAndMarketing: "Brand and marketing",
        SalesChannel: "Sales channel",
        SalesModel: "Sales model",
        CustomerRelationshipManagement: "Customer relationship management",
        NoImpactOnDeliveryProcess: "No impact on delivery process",
    },
    D7_Sourcing: {
        Make: "Make",
        Buy: "Buy",
        NoImpactOnSourcing: "No impact on sourcing",
    },
    D8_ThirdPartiesInvolved: {
        Suppliers: "Suppliers",
        Customers: "Customers",
        Competitors: "Competitors",
        MultipleParties: "Multiple parties",
        NoImpactOnThirdPartiesInvolved: "No impact on third parties involved",
    },
    D9_ValueCreationProcess: {
        Innovation: "Innovation",
        Supply: "Supply",
        Production: "Production",
        MultipleSteps: "Multiple steps",
        NoImpactOnCreationProcess: "No impact on creation process",
    },
    D10_RevenueModel: {
        Sell: "Sell",
        Lend: "Lend",
        Intermediate: "Intermediate",
        Advertising: "Advertising",
        NoImpactOnRevenueModel: "No impact on revenue model",
    },
    D11_PricingStrategy: {
        Premium: "Premium",
        Cheap: "Cheap",
        Dynamic: "Dynamic",
        NonTransparent: "Non-transparent",
        NoImpactOnPricingStrategy: "No impact on pricing strategy",
    },
    D12_DirectProfitEffect: {
        IncreaseRevenue: "Increase revenue",
        ReduceCost: "Reduce cost",
        MultipleEffects: "Multiple effects",
        NoDirectProfitImpact: "No direct profit impact",
    },
} as const;

export type BusinessModelDimensionsType = typeof BusinessModelDimensions;
type BusinessModelDimensionValues = typeof BusinessModelDimensions[keyof typeof BusinessModelDimensions][keyof typeof BusinessModelDimensions[keyof typeof BusinessModelDimensions]];

// Function to get the higher-level key from a given string
export function getHigherLevelKey(
    dimensions: typeof BusinessModelDimensions,
    searchValue: string
): string | null {
    const normalizedSearchValue = searchValue.toLowerCase();
    for (const [key, value] of Object.entries(dimensions)) {
        if ((Object.values(value) as string[]).some(v => v.toLowerCase() === normalizedSearchValue)) {
            return key;
        }
    }
    return null;
}

export const database = [
    {
        "pattern": "Add-On",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Combination,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NonTransparent,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    },
    {
        "pattern": "Affiliation",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.PurelyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.MultipleParties,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.Intermediate,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    },
    {
        "pattern": "Aikido",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Quality,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    },
    {
        "pattern": "Barter",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Price,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NonTransparent,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    },
    {
        "pattern": "Cross Selling",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Combination,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    },
    {
        "pattern": "Crowdfunding",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.DigitallyEnabled,
        BusinessModelDimensions.D3_ProductType.Financial,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.Customers,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.ReduceCost]
    },
    {
        "pattern": "Customer Loyalty",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.DigitallyEnabled,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.LockInExistingCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.CustomerRelationshipManagement,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.ReduceCost]
    },
    {
        "pattern": "Digitization",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.PurelyDigital,
        BusinessModelDimensions.D3_ProductType.IntellectualProperty,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.ReduceCost]
    },
    {
        "pattern": "E-Commerce", //E-Shop
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.PrototypicalPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.DigitallyEnabled,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    },
    {
        "pattern": "Flat Rate",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Price,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.Cheap,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    },
    {
        "pattern": "Franchising",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.PrototypicalPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.Lend,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    }
    ,
    {
        "pattern": "Target the Poor",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Price,
        BusinessModelDimensions.D5_TargetCustomers.SpecificNewCustomerSegment,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.Cheap,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    }
    ,
    {
        "pattern": "Ultimate Luxury",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.SpecificNewCustomerSegment,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.Premium,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    },

    {
        "pattern": "Shop in Shop",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.MultipleEffects]
    },

    {
        "pattern": "Robin Hood",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Price,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.Dynamic,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    },
    {
        "pattern": "Self-Service",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.Customers,
        BusinessModelDimensions.D9_ValueCreationProcess.Production,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.ReduceCost]
    },
    {
        "pattern": "Trash To Cash",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.Customers,
        BusinessModelDimensions.D9_ValueCreationProcess.MultipleSteps,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.ReduceCost]
    }
    ,
    {
        "pattern": "User Design",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.DigitallyEnabled,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Customization,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.Customers,
        BusinessModelDimensions.D9_ValueCreationProcess.Innovation,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.MultipleEffects]
    }
    ,
    {
        "pattern": "Reverse Innovation",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.Price,
        BusinessModelDimensions.D5_TargetCustomers.SpecificNewCustomerSegment,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.Innovation,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.Cheap,
        BusinessModelDimensions.D12_DirectProfitEffect.MultipleEffects]
    }
    ,
    {
        "pattern": "Reverse Engineering",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.Innovation,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.ReduceCost]
    }
    ,
    {
        "pattern": "Revenue Sharing",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.IncreaseRevenue]
    }
    ,
    {
        "pattern": "Peer to Peer",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.PurelyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NetworkEffects,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.Customers,
        BusinessModelDimensions.D9_ValueCreationProcess.Production,
        BusinessModelDimensions.D10_RevenueModel.Intermediate,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    }
    ,
    {
        "pattern": "Lock-in",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.SolutionPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.LockInExistingCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.NoImpactOnDeliveryProcess,
        BusinessModelDimensions.D7_Sourcing.NoImpactOnSourcing,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.NoImpactOnRevenueModel,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    }
    ,
    {
        "pattern": "White Label",
        "author": "Gassmann",
        "dimensions": [BusinessModelDimensions.D1_HierarchicalImpact.PrototypicalPattern,
        BusinessModelDimensions.D2_DegreeOfDigitization.NotNecessarilyDigital,
        BusinessModelDimensions.D3_ProductType.ProductTypeNotSpecified,
        BusinessModelDimensions.D4_StrategyForDifferentiation.NoImpactOnDifferentiation,
        BusinessModelDimensions.D5_TargetCustomers.NoImpactOnTargetCustomers,
        BusinessModelDimensions.D6_ValueDeliveryProcess.SalesChannel,
        BusinessModelDimensions.D7_Sourcing.Make,
        BusinessModelDimensions.D8_ThirdPartiesInvolved.NoImpactOnThirdPartiesInvolved,
        BusinessModelDimensions.D9_ValueCreationProcess.NoImpactOnCreationProcess,
        BusinessModelDimensions.D10_RevenueModel.Sell,
        BusinessModelDimensions.D11_PricingStrategy.NoImpactOnPricingStrategy,
        BusinessModelDimensions.D12_DirectProfitEffect.NoDirectProfitImpact]
    }
]


export const evalQuestions =
{
    "General Differentiation Questions":
        [
            {
                "question": "Hierarchical Impact: Do you want to reach an overall approach for designing a business model or focus on specific elements of the business, such as pricing, delivery, or customer engagement?",
                "dimension": BusinessModelDimensions.D1_HierarchicalImpact
            },
            {
                "question": "Degree of Digitization: Is the business model purely digital, digitally enabled, or does it operate independently of digital technologies?",
                "dimension": BusinessModelDimensions.D2_DegreeOfDigitization
            }
        ],
    "Value Proposition":
        [
            {
                "question": "Product Type: What is the primary type of product or service offered?",
                "dimension": BusinessModelDimensions.D3_ProductType
            },
            {
                "question": "Differentiation Strategy: How does the pattern propose to differentiate the offering?",
                "dimension": BusinessModelDimensions.D4_StrategyForDifferentiation
            }
        ],
    "Value Delivery":
        [
            {
                "question": "Target Customers: Does the pattern target specific new customer segments, lock-in existing customers, other companies (B2B) or no impact on target customers exist? ",
                "dimension": BusinessModelDimensions.D5_TargetCustomers
            },
            {
                "question": "Value Delivery Process: How does the pattern affect the delivery process, such as branding + marketing, sales channels, sales models, customer relationship management or no impact on delivery process? ",
                "dimension": BusinessModelDimensions.D6_ValueDeliveryProcess
            }
        ],
    "Value Creation":
        [
            {
                "question": "Sourcing Strategy: Does the pattern require in-house production (make), external sourcing (buy), or a mix (no impact on sourcing)?",
                "dimension": BusinessModelDimensions.D7_Sourcing
            },
            {
                "question": "Third-Party Involvement: Are suppliers, customers, competitors, or multiple parties involved in the business process or there is no impact on third parties involved?",
                "dimension": BusinessModelDimensions.D8_ThirdPartiesInvolved
            },
            {
                "question": "Creation Process: How does the pattern innovate or optimize the creation process through innovation, supply, production, multiple steps or no impact on creation process?",
                "dimension": BusinessModelDimensions.D9_ValueCreationProcess
            }
        ],
    "Value Capture": [
        {
            "question": "Revenue Model: What revenue generation strategy?",
            "dimension": BusinessModelDimensions.D10_RevenueModel
        },
        {
            "question": "Pricing Strategy: What is the pricing strategy? ",
            "dimension": BusinessModelDimensions.D11_PricingStrategy
        },
        {
            "question": "Profit Effects: Does the pattern primarily aim to increase revenue, reduce costs, have multiple effects or no direct profit impact? ",
            "dimension": BusinessModelDimensions.D12_DirectProfitEffect
        }
    ]
}




export interface BusinessPattern {
    title: string;
    description: string;
    id: number;
    baseBM: string;
    score: number;
    reason: string[];
    showReason: boolean;
    author: string;
}

// Factory function to create BusinessPattern objects with default values
function createBusinessPattern(
    baseBM: string,
    title: string,
    description: string,
    author: string,
    id: number = 0, // Default to 0
    score: number = 0, // Default to 0
    reason: string[] = [], // Default to empty array
    showReason: boolean = false // Default to false
): BusinessPattern {
    return {
        title,
        description,
        author,
        id,
        baseBM,
        score,
        reason,
        showReason,
    };
}

export const DefinedBusinessPatterns: BusinessPattern[] = [
    createBusinessPattern('Add-On', 'Add-On', 'The core offering is enhanced with optional, sometimes overpriced add-ons, allowing customers to customize their experience.', "Gassmann"),
    createBusinessPattern('Add-On', 'Freemium', 'A free basic service or product is offered, with the option to upgrade to a premium version for enhanced features.', "Gassmann"),
    createBusinessPattern('Add-On', 'Open Source', 'A free, customizable core product is provided, with additional value-added services or tools for businesses and developers.', "Gassmann"),
    createBusinessPattern('Add-On', 'Razor and Blade', 'A low-cost core product is sold, with ongoing revenue generated from the sale of complementary consumables.', "Gassmann"),
    createBusinessPattern('Add-On', 'Robin Hood', 'Premium customers pay higher prices to support subsidized access for lower-income individuals.', "Gassmann"),
    createBusinessPattern('Collab', 'Affiliation', 'Revenue or other benefits are generated by partnering with other businesses or individuals.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Aikido', 'Using an unconventional approach to differentiate from competitors and address a niche market.', "Gassmann"),
    createBusinessPattern('Marketplace', 'Auction', 'Goods or services are sold through competitive bidding to maximize value.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Barter', 'Exchanging goods or services directly without using money as a medium.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Cash Machine', 'Revenue is generated quickly from cash inflows, often in advance of expenses.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Cross Selling', 'Encouraging customers to purchase complementary products or services.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Crowdfunding', 'Raising capital by collecting small amounts of money from a large number of people.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Crowdsourcing', 'Using the collective intelligence or contributions of a community to achieve a goal or create value.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Customer Loyalty', 'Encouraging repeat business by rewarding loyal customers.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Digitization / Digitalization', 'Transforming processes or offerings by leveraging digital technology.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Direct Selling', 'Selling directly to consumers without intermediaries.', "Gassmann"),
    createBusinessPattern('Marketplace', 'E-Commerce', 'Conducting business transactions electronically over the internet.', "Gassmann"),
    createBusinessPattern('Lock-In', 'Experience Selling', 'Providing unique and memorable experiences as part of the value proposition.', "Gassmann"),
    createBusinessPattern('Pay Per Use', 'Flat Rate', 'Charging a single fixed fee for unlimited use of a service.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Fractional Ownership', 'Allowing customers to own a fraction of an asset, sharing costs and benefits.', "Gassmann"),
    createBusinessPattern('Utilizing Assets', 'Franchising', 'Allowing others to operate a business under a company’s brand and operational model.', "Gassmann"),
    createBusinessPattern('Lock-In', 'From Push to Pull', 'Shifting from pushing products to attracting customers with value-driven offers.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Guaranteed Availability', 'Ensuring product or service availability to meet customer demands reliably.', "Gassmann"),
    createBusinessPattern('Collab', 'Hidden Revenue', 'Generating revenue through indirect methods, often imperceptible to the end user.', "Gassmann"),
    createBusinessPattern('Utilizing Assets', 'Ingredient Branding', 'Building value by highlighting key components or ingredients of a product.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Integrator', 'Combining multiple processes or offerings to deliver a comprehensive solution.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Layer Player', 'Focusing on specialized services or products for integration into larger systems.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Leverage Customer Data', 'Using customer data to create value, improve services, or drive revenue.', "Gassmann"),
    createBusinessPattern('Utilizing Assets', 'Licensing', 'Generating revenue by granting usage rights to intellectual property.', "Gassmann"),
    createBusinessPattern('Lock-In', 'Lock-in', 'Creating switching costs or dependencies to retain customers.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Long Tail', 'Focusing on niche products or services to cater to diverse customer preferences.', "Gassmann"),
    createBusinessPattern('Utilizing Assets', 'Make More Of It', 'Maximizing asset utilization to increase revenue or efficiency.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Mass Customization', 'Providing tailored products or services at scale.', "Gassmann"),
    createBusinessPattern('Low Cost Low Price', 'No Frills', 'Offering essential services or products at a minimal cost by eliminating extras.', "Gassmann"),
    createBusinessPattern('Collab', 'Open Business', 'Collaborating openly with stakeholders to co-create value.', "Gassmann"),
    createBusinessPattern('Marketplace', 'Peer to Peer', 'Facilitating direct transactions between individuals.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Performance-Based Contracting', 'Revenue is tied to measurable outcomes or performance metrics.', "Gassmann"),
    createBusinessPattern('Pay Per Use', 'Rent instead of Buy', 'Allowing customers to access products or services temporarily for a fee.', "Gassmann"),
    createBusinessPattern('Collab', 'Revenue Sharing', 'Sharing revenue among partners or stakeholders to align interests.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Reverse Engineering', 'Analyzing and replicating a competitor’s product to create a similar offering.', "Gassmann"),
    createBusinessPattern('Low Cost Low Price', 'Reverse Innovation', 'Developing products in emerging markets and adapting them for established markets.', "Gassmann"),
    createBusinessPattern('Self-Service', 'Self-service', 'Empowering customers to complete tasks independently through accessible tools or systems.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Shop in Shop', 'Operating a smaller retail unit within a larger store or venue.', "Gassmann"),
    createBusinessPattern('Lock-In', 'Solution Provider', 'Offering integrated solutions tailored to customer needs.', "Gassmann"),
    createBusinessPattern('Pay Per Use', 'Subscription', 'Providing continuous access to products or services for a recurring fee.', "Gassmann"),
    createBusinessPattern('Marketplace', 'Supermarket', 'Offering a wide range of products or services under one roof.', "Gassmann"),
    createBusinessPattern('Low Cost Low Price', 'Target the Poor', 'Creating affordable offerings specifically for low-income segments.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Trash to Cash', 'Turning waste or unused materials into valuable products or resources.', "Gassmann"),
    createBusinessPattern('Marketplace', 'Two-sided Market', 'Connecting two interdependent customer groups in a single platform.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Ultimate Luxury', 'Providing exclusive, high-end offerings for premium customers.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'User Design', 'Involving customers in the design process to create personalized solutions.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'White Label', 'Producing generic products or services that can be rebranded by others.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Sensor as a Service', 'Leveraging IoT sensors to provide data-driven services.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Virtualization', 'Replacing physical infrastructure or assets with virtual counterparts.', "Gassmann"),
    createBusinessPattern('Self-Service', 'Object Self-Service', 'Integrating self-service capabilities directly into physical objects.', "Gassmann"),
    createBusinessPattern('Building Blocks', 'Prosumer', 'Encouraging customers to take an active role in the production or creation process.', "Gassmann"),
];