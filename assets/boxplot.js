const getexData = {
  // define label tree
  labels: [],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "rgba(255,0,0,0.5)",
      borderColor: "red",
      borderWidth: 1,
      outlierColor: "#999999",
      padding: 1,
      itemRadius: 0,
      data: [],
    },
  ],
};

function getDataset(ensembl, gtexensversion) {
  getexData.labels = [];
  getexData.datasets[0].data = [];
  window.myBar.data = getexData;
  window.myBar.update();
  const url =
    "https://gtexportal.org/rest/v1/expression/geneExpression?datasetId=gtex_v8&gencodeId=" +
    ensembl + "." + gtexensversion +
    "&tissueSiteDetailId=Adipose_Subcutaneous%2CAdipose_Visceral_Omentum%2CAdrenal_Gland%2CArtery_Aorta%2CArtery_Coronary%2CArtery_Tibial%2CBladder%2CBrain_Amygdala%2CBrain_Anterior_cingulate_cortex_BA24%2CBrain_Caudate_basal_ganglia%2CBrain_Cerebellar_Hemisphere%2CBrain_Cerebellum%2CBrain_Cortex%2CBrain_Frontal_Cortex_BA9%2CBrain_Hippocampus%2CBrain_Hypothalamus%2CBrain_Nucleus_accumbens_basal_ganglia%2CBrain_Putamen_basal_ganglia%2CBrain_Spinal_cord_cervical_c-1%2CBrain_Substantia_nigra%2CBreast_Mammary_Tissue%2CCells_EBV-transformed_lymphocytes%2CCells_Transformed_fibroblasts%2CCervix_Ectocervix%2CCervix_Endocervix%2CColon_Sigmoid%2CColon_Transverse%2CEsophagus_Gastroesophageal_Junction%2CEsophagus_Mucosa%2CEsophagus_Muscularis%2CFallopian_Tube%2CHeart_Atrial_Appendage%2CHeart_Left_Ventricle%2CKidney_Cortex%2CLiver%2CLung%2CMinor_Salivary_Gland%2CMuscle_Skeletal%2CNerve_Tibial%2COvary%2CPancreas%2CPituitary%2CProstate%2CSkin_Not_Sun_Exposed_Suprapubic%2CSkin_Sun_Exposed_Lower_leg%2CSmall_Intestine_Terminal_Ileum%2CSpleen%2CStomach%2CTestis%2CThyroid%2CUterus%2CVagina%2CWhole_Blood&format=json";
  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      getexData.datasets[0].label = data.geneExpression[0].datasetId;
      window.myBar.options.scales.yAxes[0].scaleLabel.labelString =
        data.geneExpression[0].unit;

      arrayLength = data.geneExpression.length;
      for (var i = 0; i < arrayLength; i++) {
        getexData.labels.push(data.geneExpression[i].tissueSiteDetailId);
        getexData.datasets[0].data.push(data.geneExpression[i].data);
        //Do something
      }
      window.myBar.data = getexData;
      window.myBar.update();
    })
    .catch(function (error) {
      console.log(error);
    });
}

window.onload = () => {
  const ctx = document.getElementById("canvas").getContext("2d");
  window.myBar = new Chart(ctx, {
    type: "boxplot",
    data: getexData,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "EXPRESSION VALUES",
      },
      scales: {
        xAxes: [
          {
            maxBarThickness: 20,
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "tpm",
            },
          },
        ],
      },
    },
  });
};
