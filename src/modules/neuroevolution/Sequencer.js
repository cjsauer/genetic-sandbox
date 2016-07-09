import synaptic from "synaptic";

/**
 * Reads in a [Strand]{@link Strand} and produces a
 * [Synaptic neural network]{@link http://synaptic.juancazala.com/#/}
 * @see {@link Strand}
 */
class Sequencer {
  /**
   * Reads in a Strand and outputs a Synaptic neural network
   * @param {Strand} strand - strand of node and connection genes
   * @return {Network} a Synaptic Network instance
   */
  read(strand) {
    const { Neuron, Layer, Network } = synaptic;
    const nodeGenes = strand.nodes.genes;
    const connGenes = strand.connections.genes;
    const neurons = [];
    const inputLayer = new Layer();
    const outputLayer = new Layer();
    const hiddenLayer = new Layer();

    // Build a neuron for each node gene
    nodeGenes.forEach((gene) => {
      let neuron = new Neuron();
      neuron.squash = Neuron.squash.LOGISTIC;
      neuron.bias = 1;
      neurons[gene.id] = neuron;

      if (gene.type === "input") {
        inputLayer.add(neuron);
      } else if (gene.type === "output") {
        outputLayer.add(neuron);
      } else if (gene.type === "hidden") {
        hiddenLayer.add(neuron);
      }
    });

    // Build a connection between neurons for every connection gene
    connGenes.forEach((gene) => {
      let weight = gene.enabled ? gene.weight : 0;
      neurons[gene.in].project(neurons[gene.out], weight);
    });

    // Build and return the finished neural network
    return new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
    });
  }
}

export default Sequencer;
