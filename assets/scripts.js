$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    html: true
  });
  $('[data-toggle="popover"]').popover({
    html: true
  })
  $("#geneModal").on("show.bs.modal", function (e) {
    var symbol = $(e.relatedTarget).data("symbol");
    var name = $(e.relatedTarget).data("name");
    var ens = $(e.relatedTarget).data("ens");
    var gtexensversion = $(e.relatedTarget).data("gtexensversion");
    var desc = $(e.relatedTarget).data("desc");
    var refs = $(e.relatedTarget).data("ref");
    var ncbi = $(e.relatedTarget).data("ncbi");
    var uniprot = $(e.relatedTarget).data("uniprot");
    var genecards = $(e.relatedTarget).data("genecards");
    var string = $(e.relatedTarget).data("string");
    var stringimg = $(e.relatedTarget).data("stringimg");
    //getDataset(ens, gtexensversion);
    $("#vizRoot").empty();
    $("#vizRootiso").empty();
    TranscriptBrowser.render("exon", symbol, "vizRoot");
    TranscriptBrowser.render("isoformTransposed", symbol, "vizRootiso");
    $('#boxplot-root').empty();
    GeneExpressionBoxplot.launch('boxplot-root', ens+"."+gtexensversion);

    var ref = refs.split("\n");

    var ul = document.createElement("ul");
    for (var i = 0; i <= ref.length - 1; i++) {
      if (ref[i] != "") {
        var li = document.createElement("li"); // create li element.
        li.innerHTML = ref[i]; // assigning text to li using array value.
        ul.appendChild(li); // append li to ul.
      }
    }
    //console.log(ul);

    $(e.currentTarget).find("#geneSymbol").text(symbol);
    $(e.currentTarget).find("#gene-name").text(name);
    $(e.currentTarget).find("#gene-ens").text(ens);
    $(e.currentTarget).find("#gene-desc").text(desc);
    $(e.currentTarget).find("#gene-references").empty();
    $(e.currentTarget).find("#gene-references").append(ul);
    $(e.currentTarget).find("#gene-ncbi").attr("href", ncbi);
    $(e.currentTarget).find("#gene-uniprot").attr("href", uniprot);
    $(e.currentTarget).find("#gene-genecards").attr("href", genecards);
    $(e.currentTarget).find("#gene-string").attr("href", string);

    $(e.currentTarget).find("#gene-img").attr("src", stringimg);
  });
});
