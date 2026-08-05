---
title: Eddy flux data processing
date: 2025-08-18
excerpt: Eddy flux data processing
tags:
  - Methods
  - Ecology
  - 数据处理
  - Physiology
  - Eddy-Flux
published: true
---

* TOC
{:toc}

## FLUXNET2015 DATA USE GUIDELINES
Notes from Xiaorong Wang:  
> The most commonly used variables are GPP_NT_CUT_REF and GPP_DT_CUT_REF, or alternatively GPP_NT_CUT_MEAN and GPP_DT_CUT_MEAN.  
  The study "Atmospheric dryness reduces photosynthesis along a large range of soil water deficits" used the REF variables and compared NT and DT values in their analysis.  
  The study "Exploring complex water stress–gross primary production relationships: Impact of climatic drivers, main effects, and interactive effects" used MEAN variables, taking the average of DT and NT values for their final data analysis.  
  If you have all these variables in your dataset, you can start by using the average of GPP_NT_CUT_MEAN and GPP_DT_CUT_MEAN.  
>
[FLUXNET2015 处理参考文献](https://www.nature.com/articles/s41597-020-0534-3):  
two different methods of extracting the USTAR thresholds: CUT & VUT. 可变 USTAR 阈值 （VUT），恒定 USTAR 阈值 （CUT）  
> The variable proposed in the SUBSET product is NEE_VUT_REF since it maintains the temporal variability (as opposed to the MEAN NEE), it is representative of the ensemble, and the VUT method is sensitive to possible changes of the canopy (density and height) and site setup, which can have an impact on the turbulence and consequently on the USTAR threshold. The RECO and GPP products in SUBSET are calculated from the corresponding NEE variables filtered with the VUT method, generating RECO_NT_VUT_REF and RECO_DT_VUT_REF for RECO, and GPP_NT_VUT_REF and GPP_DT_VUT_REF for GPP. It is important to use both daytime (DT) and nighttime (NT) variables, and consider their difference as uncertainty.
>  
A complete list of variables in the FLUXNET2015 FULLSET Data Product is available by clicking the [link](https://fluxnet.org/data/fluxnet2015-dataset/fullset-data-product/).  

## [FLUXNET Shuttle](https://data.fluxnet.org/)
The FLUXNET Shuttle is a federated, on-demand access system that enables a user to query standardized “baskets” of eddy-covariance and ancillary data maintained by **regional flux networks (e.g., AmeriFlux, ICOS, OzFlux)**. User queries return a versioned package with persistent identifiers for exact citation and reconstruction. Conceptually outlined by Papale (2020), the Shuttle replaces infrequent monolithic releases such as the FLUXNET 2015 dataset, with **continuous, user-triggered compilations of network-published FLUXNET-format products, preserving provenance while enabling timely access to newly processed site-years**.

## [The FLUXNET Data Explorer](https://www.keenangroup.info/fluxnet-data-explorer/)
很好用的一个数据下载平台，由Trevor F. Keenan课题组开发维护  

## Tools  
Tools for u* filtering, gap filling, partitioning NEE, and plotting  
### REddyProc
[REddyProcWeb online tool](https://bgc.iwww.mpg.de/5622399/REddyProc)  
[REddyProc package](https://cran.r-project.org/web/packages/REddyProc/index.html)  
### eddy4R
[eddy4R](https://github.com/NEONScience/eddy4R-documentation/wiki)