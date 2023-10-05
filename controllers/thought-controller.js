const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

const thoughtController = {

    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: 'notFound' });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            thought ? res.json(thought) : res.status(404).json({ message: 'notFound' });
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

module.exports = thoughtController;