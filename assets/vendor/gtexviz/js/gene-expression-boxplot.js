/**
 * Copyright © 2015 - 2018 The Broad Institute, Inc. All rights reserved.
 * Licensed under the BSD 3-clause license (https://github.com/broadinstitute/gtex-viz/blob/master/LICENSE.md)
 */
"use strict";

import { json } from "d3-fetch";
import {
  getGtexUrls,
  parseGeneExpressionForBoxplot,
  parseTissues,
} from "./modules/gtexDataParser";

import Boxplot from "./modules/Boxplot";

export function launch(rootId, geneId, urls = getGtexUrls()) {
  json(urls.geneId + geneId, { credentials: "include" }) // query the gene by geneId--gene name or gencode ID with or without versioning
    .then(function (data) {
      // get the gene object and its gencode Id
      const gene = parseGenes(data, true, geneId);
      const gencodeId = gene.gencodeId;
      const promises = [
        json(urls.tissue, { credentials: "include" }),
        json(urls.geneExp + gencodeId, { credentials: "include" }),
      ];

      Promise.all(promises).then(function (args) {
        const tissues = parseTissues(args[0]);
        const tissueIdNameMap = {};
        const tissueIdColorMap = {};
        tissues.forEach((x) => {
          tissueIdNameMap[x.tissueSiteDetailId] = x.tissueSiteDetail;
          tissueIdColorMap[x.tissueSiteDetailId] = x.colorHex;
        });
        const boxplotData = parseGeneExpressionForBoxplot(
          args[1],
          tissueIdNameMap,
          tissueIdColorMap
        );
        let ids = {
          rootId: rootId,
          tooltipId: "boxplot-tooltip",
        };
        let boxplot = new Boxplot(boxplotData);
        let plotOptions = {
          width: 1000,
          height: 600,
          marginLeft: 50,
          marginRight: 100,
          marginBottom: 160,
          yAxisUnit: "TPM",
        };
        boxplot.render(ids.rootId, plotOptions);
      });
    })
    .catch(function (err) {
      console.error(err);
      $("#spinner").hide();
    });
}
